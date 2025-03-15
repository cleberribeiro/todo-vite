import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ToDoList from './ToDoList.vue';

describe('ToDoList Component', () => {
  let wrapper: ReturnType<typeof mount<typeof ToDoList>>;

  beforeEach(() => {
    wrapper = mount(ToDoList);
  });

  it('should renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should adds a new todo item', async () => {
    const input = wrapper.find('[data-test="test-inpt-task"]');
    const button = wrapper.find('[data-test="test-btn-add"]');
    // Set the input value
    await input.setValue('New Todo');

    await button.trigger('click');

    expect(wrapper.findAll('[data-test="test-li-tasks"]')).toHaveLength(1);
    expect(wrapper.findAll('[data-test="test-li-tasks"]')[0].text()).toBe('New Todo');
    expect(input.element.value).toBe('')
  });

  it('should remove a todo item', async () => {
    // First, add a task to the list
    const input = wrapper.find('[data-test="test-inpt-task"]');
    const addButton = wrapper.find('[data-test="test-btn-add"]');

    await input.setValue('Task to remove');
    await addButton.trigger('click');

    // Verify the task was added
    const tasks = wrapper.findAll('[data-test="test-li-tasks"]');
    console.log(tasks.values());
    expect(tasks.length).toBe(2);

    // Get the task ID from the first task in the list
    // Since we just created it, we can find it in the component's data
    const task = wrapper.vm.tasks[0];
    const taskId = task.id;

    // Find the remove button with the dynamic data-test attribute
    const removeButton = wrapper.find(`[data-test="test-btn-remove-${taskId}"]`);

    // Now trigger the click event
    await removeButton.trigger('click');

    // Verify the task was removed
    expect(wrapper.findAll('[data-test="test-li-tasks"]').length).toBe(1);
  });
});